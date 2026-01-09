import frappe
import requests
from frappe.core.doctype.user.user import get_all_roles


@frappe.whitelist(allow_guest=True)
def get_settings():
    try:
        from api_explorer.core.config.manager import ConfigManager
        return ConfigManager.get_settings()
    except Exception as e:
        frappe.log_error(f"Get settings error: {str(e)}")
        return ConfigManager.get_default_settings()
    
@frappe.whitelist()
def get(role_name=None):
    roles = get_all_roles()    
    if role_name in roles:
        return [{
            "role": role_name,
            "enabled": True
        }]
    else:
        return [{
            "role": role_name,
            "enabled": False
        }]
    

@frappe.whitelist()
def switch_theme(theme):
    if theme in ["Dark", "Light", "Automatic"]:
        doc=frappe.get_doc("User", frappe.session.user)
        doc.desk_theme = theme
        doc.save()
        doc.reload()
        

@frappe.whitelist()
def import_items_from_json():
    url = "https://fakestoreapi.com/products"  
    response = requests.get(url)
    data = response.json()

    for product in data:
        if not frappe.db.exists("Item", {"item_code": str(product["id"])}):
            item = frappe.get_doc({
                "doctype": "Item",
                "naming_series": "STO-ITEM-.YYYY.-",
                "item_code": str(product["id"]),
                "item_name": product["title"],
                "item_group": "Products",   
                "stock_uom": "Nos",        
                "standard_rate": product["price"],
                "description": product["description"],
                "image": product["image"],
                "is_stock_item": 1,
                "disabled": 0,
                "is_sales_item": 1,
                "is_purchase_item": 1
            })
            item.insert()
            frappe.db.commit()
    return "Items Imported Successfully!"      


@frappe.whitelist(allow_guest=True)
def get_invoice_data():
    doc = frappe.get_doc("Sales Invoice", "ACC-SINV-2026-00001")

    items = []
    for item in doc.items:
        items.append({
            "item_code": item.item_code,
            "item_name": item.item_name,
            "qty": item.qty,
            "rate": item.rate,
            "amount": item.amount
        })

    return {
        "items": items,
        "total": doc.grand_total
    }
@frappe.whitelist(allow_guest=True)
def create_custom_field_sales_invoice_item():
    """
    Create a custom field in Sales Invoice Item and assign to Module
    """

    # Define the custom field
    field_config = {
        "doctype": "Custom Field",
        "dt": "Sales Invoice Item",          # Target DocType
        "fieldname": "custom_extra_info",   # Internal name
        "label": "Extra Information",       # Visible label
        "fieldtype": "Text Editor",         # Field type
        "insert_after": "item_name",        # Place after this field
        "owner": "Administrator",
        "module": "Accounts",               # Assign module
    }

    # Check if field already exists
    if not frappe.db.exists("Custom Field", {"dt": "Sales Invoice Item", "fieldname": "custom_extra_info"}):
        try:
            custom_field = frappe.get_doc(field_config)
            custom_field.insert()
            frappe.db.commit()
            frappe.msgprint("✅ Custom field 'custom_extra_info' added to Sales Invoice Item under Accounts module.")
        except Exception as e:
            frappe.log_error(frappe.get_traceback(), "Failed to add custom field to Sales Invoice Item")
            frappe.msgprint("❌ Failed to add custom field: " + str(e))
    else:
        frappe.msgprint("ℹ Custom field 'custom_extra_info' already exists in Sales Invoice Item.")

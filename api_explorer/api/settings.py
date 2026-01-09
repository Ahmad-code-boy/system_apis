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



            

import frappe
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
        
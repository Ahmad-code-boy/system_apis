# In your_page.py
import frappe

def get_context(context):
    # Fetch data from a DocType
    items = frappe.get_all("Item", fields=["item_code", "item_name"], limit=10)
    # Add the data to the context dictionary
    context.update({"item_list": items})

frappe.pages['custom-page'].on_page_load = function (wrapper) {
    new InvoicePage(wrapper);
};

InvoicePage = Class.extend({
    init: function (wrapper) {
        this.page = frappe.ui.make_app_page({
            parent: wrapper,
            title: 'Sales Invoice Data',
            single_column: true
        });

        this.page.main.html(frappe.render_template("custom_page"));
        this.load_data();
    },

    load_data: function () {
        frappe.call({
            method: "api_explorer.api.settings.get_invoice_data",
            callback: function (r) {
                console.log(r.message);

                let rows = "";
                r.message.items.forEach(function (row, i) {
                    rows += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${row.item_code}</td>
                    <td>${row.item_name}</td>
                    <td>${row.qty}</td>
                    <td>${row.rate}</td>
                    <td>${row.amount}</td>
                </tr>
            `;
                    $("#grand-total").text(r.message.total);

                });
                $("#items-table-body").html(rows);
                $("#total").html(t)
            }
        });

    }
});

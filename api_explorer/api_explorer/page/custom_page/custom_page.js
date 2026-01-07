frappe.pages['custom-page'].on_page_load = function (wrapper) {
	let mypage = new Mypage(wrapper);
	mypage.page.set_title(`My Custom Page`);
}

Mypage = Class.extend({
	init: function (wrapper) {
		this.page = frappe.ui.make_app_page({
			parent: wrapper,
			title: 'Custom Page',
			single_column: true
		});
		this.make();
	},

	make: function () {
		// Main heading
		let html = `<h1 style="color: blue;">Welcome to Custom Page</h1>`;

		// Widget/Title area
		let title_html = `
  <div class="widget dashboard-widget-box" data-widget-name="uo48f5dqba">
			<div class="widget-head">
				<div class="widget-label">
					<div class="widget-title" title="Open Projects"><span class="ellipsis" title="Open Projects">Open Projects</span></div>
					<div class="widget-subtitle"></div>
				</div>
				<div class="widget-control"><div class="chart-actions dropdown pull-right">
			<button data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="btn btn-xs btn-secondary chart-menu">
				<svg class="icon icon-sm">
					<use href="#icon-dot-horizontal">
					</use>
				</svg>
			</button>
			<ul class="dropdown-menu dropdown-menu-right">
				<li><a class="dropdown-item" data-action="action-refresh">Refresh</a></li><li><a class="dropdown-item" data-action="action-edit">Edit</a></li><li><a class="dropdown-item" data-action="action-reset">Reset Chart</a></li><li><a class="dropdown-item" data-action="action-list">Project Summary Report</a></li>
			</ul>
		</div><div class="filter-chart btn btn-xs pull-right">
				<svg class="icon  icon-sm" style="" aria-hidden="true">
			<use class="" href="#icon-filter"></use>
		</svg>
			</div></div>
			</div>
			<div class="widget-body"><div class="chart-loading-state text-muted" style="height: 240px; display: none;">Loading...</div><div class="chart-loading-state text-muted" style="height: 240px; display: none;">No Data</div><div><div class="chart-container"><div class="graph-svg-tip comparison" style="top: 0px; left: 0px; opacity: 0;"><span class="title">Ahmad<strong></strong></span>
				<ul class="data-point-list"><li><div class="tooltip-legend" style="background: #fc4f51;"></div>
					<div>
						<div class="tooltip-value"></div>
						<div class="tooltip-label"></div>
					</div></li><li><div class="tooltip-legend" style="background: #78d6ff;"></div>
					<div>
						<div class="tooltip-value"></div>
						<div class="tooltip-label"></div>
					</div></li><li><div class="tooltip-legend" style="background: #7575ff;"></div>
					<div>
						<div class="tooltip-value"></div>
						<div class="tooltip-label"></div>
					</div></li></ul>
				<div class="svg-pointer" style="left: 50%;"></div></div><svg class="frappe-chart chart" width="987" height="240"><defs></defs><g class="bar-chart chart-draw-area" transform="translate(50, 30)"><g class="y axis" transform=""><g transform="translate(0, 130)" stroke-opacity="1"><line class="line-horizontal " x1="-6" x2="913" y1="0" y2="0"></line><text x="-10" y="0" dy="3px" font-size="10px" text-anchor="end">0</text></g><g transform="translate(0, 104)" stroke-opacity="1"><line class="line-horizontal " x1="-6" x2="913" y1="0" y2="0"></line><text x="-10" y="0" dy="3px" font-size="10px" text-anchor="end">1</text></g><g transform="translate(0, 78)" stroke-opacity="1"><line class="line-horizontal " x1="-6" x2="913" y1="0" y2="0"></line><text x="-10" y="0" dy="3px" font-size="10px" text-anchor="end">2</text></g><g transform="translate(0, 52)" stroke-opacity="1"><line class="line-horizontal " x1="-6" x2="913" y1="0" y2="0"></line><text x="-10" y="0" dy="3px" font-size="10px" text-anchor="end">3</text></g><g transform="translate(0, 26)" stroke-opacity="1"><line class="line-horizontal " x1="-6" x2="913" y1="0" y2="0"></line><text x="-10" y="0" dy="3px" font-size="10px" text-anchor="end">4</text></g><g transform="translate(0, 0)" stroke-opacity="1"><line class="line-horizontal " x1="-6" x2="913" y1="0" y2="0"></line><text x="-10" y="0" dy="3px" font-size="10px" text-anchor="end">5</text></g></g><g class="x axis" transform=""><g transform="translate(453.5, 0)"><line class="line-vertical " x1="0" x2="0" y1="136" y2="130"></line><text x="0" y="140" dy="10px" font-size="10px" text-anchor="middle">Ahmad</text></g></g><g class="dataset-units dataset-bars dataset-0" transform=""><rect class="bar mini" style="fill: #fc4f51" data-point-index="0" x="226.75" y="130" width="453.5" height="0"></rect></g><g class="dataset-units dataset-bars dataset-1" transform=""><rect class="bar mini" style="fill: #78d6ff" data-point-index="0" x="226.75" y="130" width="453.5" height="0"></rect></g><g class="dataset-units dataset-bars dataset-2" transform=""><rect class="bar mini" style="fill: #7575ff" data-point-index="0" x="226.75" y="130" width="453.5" height="0"></rect></g></g><g class="chart-legend" transform="translate(50, 200)"><g transform="translate(0, 5)"><rect class="legend-dot" x="0" y="-8" height="12" width="12" rx="3" fill="#fc4f51"></rect><text class="legend-dataset-label" x="12" y="0" dx="8.75px" dy="2.9166666666666665px" font-size="14px" text-anchor="start">Overdue</text></g><g transform="translate(150, 5)"><rect class="legend-dot" x="0" y="-8" height="12" width="12" rx="3" fill="#78d6ff"></rect><text class="legend-dataset-label" x="12" y="0" dx="8.75px" dy="2.9166666666666665px" font-size="14px" text-anchor="start">Completed</text></g><g transform="translate(300, 5)"><rect class="legend-dot" x="0" y="-8" height="12" width="12" rx="3" fill="#7575ff"></rect><text class="legend-dataset-label" x="12" y="0" dx="8.75px" dy="2.9166666666666665px" font-size="14px" text-anchor="start">Total Tasks</text></g></g></svg></div></div></div>
			<div class="widget-footer"></div>
		</div>`;

		// 4 cards
		let card = '';
		for (let i = 1; i <= 4; i++) {
			card += `
            <div class="card" style="width: 18rem; display: inline-block; margin: 10px;">
                <div class="card-body">
                    <h5 class="card-title">Card title ${i}</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>`;
		}

		// Append everything to the page main
		$(html).appendTo(this.page.main);
		$(title_html).appendTo(this.page.main);
		$(card).appendTo(this.page.main);
	}
});

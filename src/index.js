import React    							 from 'react';
import ReactDOM 							 from 'react-dom';
import AdData   							 from './helpers/ad_data_helper.js';
import { Table, Column, Cell } from 'fixed-data-table-2';
import 'fixed-data-table-2/dist/fixed-data-table.css';
import './index.css';

class AdObjectsCell extends React.Component {
	render() {
		const {rowIndex, adMetricData} = this.props;
		const adObjectName = adMetricData[rowIndex]['name'];

		return (
			<Cell className={"cell-data"}>
				{adObjectName}
			</Cell>
		);
	}
}

class AdMetricsCell extends React.Component {
	render() {
		const {rowIndex, metricName, adMetricData} = this.props;
		const metricForColumn = adMetricData[rowIndex][metricName];
		
		return (
			<Cell className={"cell-data"}>
				{metricForColumn}
			</Cell>
		);
	}
}

class AdsTable extends React.Component {
	constructor(props) {
		super(props);

		// Retrieve and format ad object and metric data
		const adData = new AdData;
		adData.mergeApiData();

		this.state = {
			"adMetricData": adData.metrics,
			"adMetricNames": adData.metricNames
		};
	}

	render() {
		var _this = this;

		return (
			<div className="wrapper">
				<Table
					rowsCount={this.state.adMetricData.length}
					rowHeight={50}
					width={500}
					height={250}
					headerHeight={50}
				>
					<Column
						header={<Cell className={"header-name"}>Ad Name</Cell>}
						cell={
							<AdObjectsCell
								adMetricData={this.state.adMetricData}
							/>
						}
						width={75}
						fixed={true}
					/>
					{this.state.adMetricNames.map(function(metricName) {
						return <Column
							key="metricName"
							value="metricName"
							header={<Cell className={"header-name"}>{metricName}</Cell>}
							cell={
								<AdMetricsCell
									metricName={metricName}
									adMetricData={_this.state.adMetricData}
								/>
							}
							width={150}
						/>
					})}
				</Table>
			</div>
		);
	}
}

ReactDOM.render(
	<AdsTable />,
	document.getElementById('root')
);
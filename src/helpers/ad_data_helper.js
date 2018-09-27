import { AdObjects, AdMetrics } from './constants_helper.js';

class AdData {
	// Get ad metric column names
	metricNames = AdMetrics.column_names;

	// Initialize empty array to store both ad object and metric data
	metrics = []

	// Combine ad object and metric row data
	mergeApiData() {
		var _this = this;

	  AdObjects.forEach(function(object) {
		  AdMetrics.rows.forEach(function(metric) {
	      if(metric['remote_id'] === object['remote_id']) {
	        _this.metrics.push({...object, ...metric});
	      }
	    });
	  });
	};
}

export default AdData;
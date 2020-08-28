
export default {
	BASE_URL: {
		URL: 'http://ec2-13-229-233-71.ap-southeast-1.compute.amazonaws.com:4401/',
		URL_IMG: 'http://ec2-13-229-233-71.ap-southeast-1.compute.amazonaws.com:4401/',
		URL_UPLOAD: 'http://ec2-13-229-233-71.ap-southeast-1.compute.amazonaws.com:4401/upload-image/',
		URL_DELETE: 'http://ec2-13-229-233-71.ap-southeast-1.compute.amazonaws.com:4401/delete-image/',
	},
	BUDGET_URL: {
		URL: 'http://ec2-13-229-233-71.ap-southeast-1.compute.amazonaws.com:4402/',
		URL_IMG: 'http://ec2-13-229-233-71.ap-southeast-1.compute.amazonaws.com:4402/',
		URL_UPLOAD: 'http://ec2-13-229-233-71.ap-southeast-1.compute.amazonaws.com:4402/upload-image/',
		URL_DELETE: 'http://ec2-13-229-233-71.ap-southeast-1.compute.amazonaws.com:4402/delete-image/',
	},
	FINANCE_URL: {
		URL: 'http://ec2-13-229-233-71.ap-southeast-1.compute.amazonaws.com:4401/',
		URL_IMG: 'http://ec2-13-229-233-71.ap-southeast-1.compute.amazonaws.com:4401/',
		URL_UPLOAD: 'http://ec2-13-229-233-71.ap-southeast-1.compute.amazonaws.com:4401/upload-image/',
		URL_DELETE: 'http://ec2-13-229-233-71.ap-southeast-1.compute.amazonaws.com:4401/delete-image/',
	},
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		// "Access-Control-Allow-Origin": "*",
		'x-access-token': localStorage.getItem("x-access-token"),
	}
}

// *************HOST************* */
// export default {
// 	URL: 'http://13.229.233.71:5001/',
// 	URL_IMG: 'http://13.229.233.71:5001/',
// 	URL_UPLOAD: 'http://13.229.233.71:5001/upload-image/',
// 	URL_DELETE: 'http://13.229.233.71:5001/delete-image/',
// }

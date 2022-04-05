export const statusColors = {
	waiting: '#00A676',
	delegated: '#00A676',
	error: '#6E0E0A',
	interrupted: '#D74E09',
	expired: '#D74E09',
	forbidden: '#D74E09',
	finished: '#124E78',
	running: '#2691DF',
	pending: '#2691DF'
}

export function contrastingColor(hexcolor) {

	if (!hexcolor) return 'white';

	hexcolor = hexcolor.replace("#", "");
	var r = parseInt(hexcolor.substr(0, 2), 16);
	var g = parseInt(hexcolor.substr(2, 2), 16);
	var b = parseInt(hexcolor.substr(4, 2), 16);
	var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
	return (yiq >= 128) ? 'black' : 'white';
}
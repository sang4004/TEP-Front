import FuseUtils from 'fuse/lib/utils';
import _ from 'lodash-module';

function NoteModel(data) {
	data = data || {};

	return _.defaults(data, {
		id: FuseUtils.generateGUID(),
		title: '',
		description: '',
		archive: false,
		image: '',
		time: null,
		reminder: null,
		checklist: [],
		labels: []
	});
}

export default NoteModel;

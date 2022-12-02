import FuseUtils from 'fuse/lib/utils';
import _ from 'lodash-module';

function NoteListItemModel(data) {
	data = data || {};

	return _.defaults(data, {
		id: FuseUtils.generateGUID(),
		text: '',
		checked: false
	});
}

export default NoteListItemModel;

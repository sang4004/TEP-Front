import FuseUtils from 'fuse/lib/utils';
import _ from 'lodash-module';

function ChecklistModel(data) {
	data = data || {};

	return _.defaults(data, {
		id: FuseUtils.generateGUID(),
		name: '',
		checkItems: []
	});
}

export default ChecklistModel;

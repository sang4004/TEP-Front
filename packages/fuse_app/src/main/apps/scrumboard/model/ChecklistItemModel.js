import FuseUtils from 'fuse/lib/utils';
import _ from 'lodash-module';

function ChecklistItemModel(data) {
	data = data || {};

	return _.defaults(data, {
		id: FuseUtils.generateGUID(),
		name: '',
		checked: false
	});
}

export default ChecklistItemModel;

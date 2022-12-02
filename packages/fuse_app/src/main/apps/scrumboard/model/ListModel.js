import FuseUtils from 'fuse/lib/utils';
import _ from 'lodash-module';

function ListModel(data) {
	data = data || {};

	return _.defaults(data, {
		id: FuseUtils.generateGUID(),
		name: '',
		idCards: []
	});
}

export default ListModel;

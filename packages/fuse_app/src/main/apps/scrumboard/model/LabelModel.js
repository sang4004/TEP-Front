import FuseUtils from 'fuse/lib/utils';
import _ from 'lodash-module';

function LabelModel(data) {
	data = data || {};
	return _.defaults(data, {
		id: FuseUtils.generateGUID(),
		name: '',
		class: 'bg-blue text-white'
	});
}

export default LabelModel;

import FuseUtils from 'fuse/lib/utils';
import _ from 'lodash-module';

function CardModel(data) {
	data = data || {};

	return _.defaults(data, {
		id: FuseUtils.generateGUID(),
		name: '',
		description: '',
		idAttachmentCover: '',
		idMembers: [],
		idLabels: [],
		attachments: [],
		subscribed: true,
		checklists: [],
		checkItems: 0,
		checkItemsChecked: 0,
		comments: [],
		activities: [],
		due: ''
	});
}
export default CardModel;

const DEFAULT_STATE = {
	currentList: []
};

const listen = (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case 'SET_CURRENT_LIST':
			return {
				...state, 
				currentList: action.list
			};
		case 'CLEAR_CURRENT_LIST':
			return {
				...state, 
				currentList: []
			};
		default: 
			return state;
	}
};

export default listen;
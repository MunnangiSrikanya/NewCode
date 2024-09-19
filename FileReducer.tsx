import { UPLOADED_FILES, FileActionTypes,CLEAR_FILES } from '../Actions/fileActionTypes';

interface FileState {
    uploadedFiles: File[];
}

const initialState: FileState = {
    uploadedFiles: [],
};

const FileReducer = (state = initialState, action: FileActionTypes): FileState => {
    switch (action.type) {
        case UPLOADED_FILES:
            return {
                ...state,
                uploadedFiles: action.payload,
            };
        case CLEAR_FILES:
            return {
                ...state,
                uploadedFiles: [], 
            };
        default:
            return state;
    }
};

export default FileReducer;

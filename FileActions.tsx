import { UPLOADED_FILES,CLEAR_FILES } from './fileActionTypes';

const FileActions = {
    UploadedFiles: (payload: File[]) => ({
        type: UPLOADED_FILES,
        payload,
    }),
    clearFiles:()=>({
        type:CLEAR_FILES
    })
};

export default FileActions;

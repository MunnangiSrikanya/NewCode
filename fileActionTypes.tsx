export const UPLOADED_FILES = 'UPLOADED_FILES';
export const CLEAR_FILES="CLEAR_FILES"

export interface UploadedFilesAction {
    type: typeof UPLOADED_FILES;
    payload: File[];
}

export interface ClearFilesAction {
    type: typeof CLEAR_FILES;
}

export type FileActionTypes = UploadedFilesAction | ClearFilesAction;

import axios, {type AxiosInstance} from "axios";
import type {NoteFormData, Note} from "@/types/note";

const PER_PAGE = 10;

export interface NoteServiceResponse {
    notes: Note[];
    totalPages: number;
}

export interface FetchNotesProps {
    search: string;
    page: number;
    tag?: string;
}

const api: AxiosInstance = axios.create({
    baseURL: "https://notehub-public.goit.study/api",
    headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`
    }
})

export const fetchNotes = async ({search, page, tag}: FetchNotesProps): Promise<NoteServiceResponse> => {
    const { data } = await api.get<NoteServiceResponse>("/notes", {
        params: {
            search,
            page,
            ...(tag && tag !=="all" && { tag }),
            perPage: PER_PAGE,
        }
    });
    return data;
}

export const createNote = async (noteData: NoteFormData): Promise<Note> => {
    const { data } = await api.post<Note>("/notes", noteData);
    return data;
}

export const deleteNote = async (id: string): Promise<Note> => {
    const { data } = await api.delete<Note>(`/notes/${id}`);
    return data;
}

export const fetchNoteById = async (id: string): Promise<Note> => {
    const { data } = await api.get<Note>(`/notes/${id}`);
    return data;
}

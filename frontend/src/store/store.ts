import { create } from "zustand";

// Define the Draft interface if not already defined
export interface Draft {
  title: string;
  content: string;
}

// Zustand store for handling blog draft
type UseDraft = {
  blogDraft: Draft | null;
  updateDraft: (newDraft: Draft) => void;
  removeDraft: () => void;
};

const useDraft = create<UseDraft>((set) => ({
  blogDraft: null,
  updateDraft: (newDraft: Draft) => set({ blogDraft: newDraft }),
  removeDraft: () => set({ blogDraft: null }),
}));

// Zustand store for publish state
type UsePublish = {
  publishReady: boolean;
  updatePublish: () => void;
};

const usePublish = create<UsePublish>((set) => ({
  publishReady: false,
  updatePublish: () => set((state) => ({ publishReady: !state.publishReady })), // Toggle the publish state
}));

export { useDraft, usePublish };

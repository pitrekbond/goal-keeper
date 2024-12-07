import supabase from "./supabase";

export async function getNotes(userId) {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("userId", userId)
    .order("id", { ascending: true });

  if (error) {
    console.error(error);
    throw new Error("Notes could not be loaded");
  }

  return data;
}

export async function deleteNote(noteId) {
  const { error } = await supabase.from("notes").delete().eq("id", noteId);

  if (error) {
    console.error(error);
    throw new Error("Note could not be deleted");
  }
}

export async function createEditNote(newNote, noteId) {
  let query = supabase.from("notes");
  let result;

  if (!noteId) {
    result = await query.insert([newNote]);
  } else {
    result = await query.update(newNote).eq("id", noteId);
  }

  const { data, error } = result;

  if (error) {
    console.error(error);
    throw new Error("Note could not be created or updated");
  }

  return data;
}

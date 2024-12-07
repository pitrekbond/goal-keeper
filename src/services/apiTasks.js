import supabase from "./supabase";

export async function getTasks(userId) {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("userId", userId)
    .order("id", { ascending: true });

  if (error) {
    console.error(error);
    throw new Error("Tasks could not be loaded");
  }

  return data;
}

export async function deleteTask(taskId) {
  const { error } = await supabase.from("tasks").delete().eq("id", taskId);

  if (error) {
    console.error(error);
    throw new Error("Task could not be deleted");
  }
}

export async function createEditTask(newTask, taskId) {
  let query = supabase.from("tasks");
  let result;

  if (!taskId) {
    result = await query.insert([newTask]).select();
  } else {
    result = await query.update(newTask).eq("id", taskId).select();
  }

  const { data, error } = result;

  if (error) {
    console.error(error);
    throw new Error("Task could not be created or updated");
  }

  return data[0];
}

export async function completeTask(taskId, date = new Date()) {
  const formattedDate = date.toISOString().split("T")[0];
  const { error } = await supabase
    .from("tasks")
    .update({ stage: "Completed", completionDate: formattedDate })
    .eq("id", taskId);

  if (error) {
    console.error(error);
    throw new Error("Task could not be completed");
  }
}

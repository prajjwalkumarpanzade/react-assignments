const host = process.env.REACT_APP_BASE_URL;

export const fetchDelete = async (id: any) => {
  const route = "/todos/";
  const url = host + route + id;

  const res = await fetch(url, {
    method: "DELETE",
  })
    .then((r: any) => r.ok)
    .catch((r: any) => r.ok);

  return res;
};

export const fetchCreate = async (todoItem: any) => {
  const route = "/todos";
  const url = host + route;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todoItem),
  })
    .then((r: any) => r.ok)
    .catch((r: any) => r.ok);

  return res;
};
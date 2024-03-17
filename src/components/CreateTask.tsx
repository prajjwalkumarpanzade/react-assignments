import { useFormik } from "formik";
import { GenerateRandomNo } from "../helper/helper";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { toast } from "react-toastify";
import { fetchCreate } from "../service/fetchData";

const CreateTask = () => {
  const navigate = useNavigate();

  const validationSchema = yup.object({
    title: yup
      .string()
      .max(20, "Title length must be less than 20 characters")
      .required("Title is required"),
    description: yup.string().required("Description is required"),
    assignee: yup.string().required("Assignee is required"),
    dueDate: yup
      .date()
      .min(new Date(), "Due date cannot be less than today !!")
      .required("Due Date is required"),
  });

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        title: "",
        description: "",
        assignee: "",
        dueDate: "",
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        const todoItem = {
          //id: GenerateRandomNo(),
          task: values.title,
          description: values.description,
          assignee: values.assignee,
          isComplete: false,
          dueDate: values.dueDate,
        };

        if (await fetchCreate(todoItem)) {
          toast.success("Task Added Successfully !!");
          navigate("/");
        }
      },
    });

  return (
    <div className="task mt-5" style={{ marginLeft: "500px" }}>
      <form
        onSubmit={handleSubmit}
        className="w-50 p-4"
        style={{ border: "1px solid grey", backgroundColor: "#f5f5ef" }}
      >
        <h2 className="card-header">- Add Task -</h2>
        <div className="mb-3 p-2">
          <label className="form-label">Title :</label>
          <input
            type="text"
            className="form-control"
            name="title"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.title}
            required
            autoFocus
          />
          {errors.title && touched.title ? (
            <p style={{ color: "red" }}>{errors.title}</p>
          ) : (
            ""
          )}

          <label className="form-label">Description :</label>
          <textarea
            className="form-control"
            name="description"
            onChange={handleChange}
            value={values.description}
            onBlur={handleBlur}
            required
          ></textarea>
          {errors.description && touched.description ? (
            <p style={{ color: "red" }}>{errors.description}</p>
          ) : (
            ""
          )}

          <label className="form-label">Assignee :</label>
          <input
            type="text"
            className="form-control"
            name="assignee"
            onChange={handleChange}
            value={values.assignee}
            onBlur={handleBlur}
            required
          />
          {errors.assignee && touched.assignee ? (
            <p style={{ color: "red" }}>{errors.assignee}</p>
          ) : (
            ""
          )}

          <label className="form-label">Due Date :</label>
          <input
            type="date"
            className="form-control w-50"
            name="dueDate"
            onChange={handleChange}
            value={values.dueDate}
            onBlur={handleBlur}
            required
          />
          {errors.dueDate && touched.dueDate ? (
            <p style={{ color: "red" }}>{errors.dueDate}</p>
          ) : (
            ""
          )}
        </div>

        <button type="submit" className="btn btn-secondary m-2 w-25">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
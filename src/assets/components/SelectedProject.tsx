import { useContext } from "react";
import NewTask from "./NewTask";
import Tasks from "./Tasks";
import { ProjectManagementContext } from "../../store/project-management-context-provider";

const SelectedProject = () => {
  const { handleDeleteProject, selectedProjectData } = useContext(
    ProjectManagementContext
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {selectedProjectData?.title}
          </h1>
          <p className="text-sm text-gray-500">
            Due:{" "}
            {new Date(selectedProjectData?.dueDate || "").toLocaleDateString()}
          </p>
        </div>
        <button
          onClick={() =>
            selectedProjectData && handleDeleteProject(selectedProjectData.id)
          }
          className="px-6 py-2 text-red-600 border-2 border-red-600 rounded-md hover:bg-red-600 hover:text-white transition-all duration-200 font-medium"
        >
          Delete Project
        </button>
      </header>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          Description
        </h2>
        <p className="text-gray-600 leading-relaxed">
          {selectedProjectData?.description}
        </p>
      </section>

      <section className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <NewTask />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <Tasks />
        </div>
      </section>
    </div>
  );
};

export default SelectedProject;

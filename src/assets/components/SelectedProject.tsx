import NewTask from "./NewTask";
import Tasks from "./Tasks";

interface ProjectData {
  id: number;
  title: string;
  description: string;
  dueDate: string;
}

interface SelectedProjectProps {
  projectsState: {
    projectIndicator: undefined | null | string;
    projects: Array<ProjectData & { id: number }>;
    tasks: Array<{ id: string; text: string; projectId: string }>;
  };
  onDeleteProject: (projectId: number) => void;
  selectedProjectData: (ProjectData & { id: number }) | null;
  onAddTask: (text: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export default function SelectedProject({
  projectsState,
  onDeleteProject,
  selectedProjectData,
  onAddTask,
  onDeleteTask,
}: SelectedProjectProps) {
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
            selectedProjectData && onDeleteProject(selectedProjectData.id)
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
          <NewTask onAddTask={onAddTask} />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <Tasks onDeleteTask={onDeleteTask} projectState={projectsState} />
        </div>
      </section>
    </div>
  );
}

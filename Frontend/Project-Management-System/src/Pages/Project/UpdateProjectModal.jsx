import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { updateProjectById } from "@/Redux/Project/Action"; // Ensure this path is correct
import { ScrollArea } from "@/components/ui/scroll-area";
import { tags as tagList } from "./ProjectList"; // Adjust path as needed
import { Checkbox } from "@/components/ui/checkbox";

/**
 * UpdateProjectModal Component
 *
 * This component renders a modal dialog for updating an existing project. 
 * It allows users to modify the project's name, description, category, and tags.
 * The form is pre-filled with the current project details and updates are dispatched to the store.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.open - Controls whether the modal is open or closed.
 * @param {Function} props.setOpen - Function to toggle the modal's open state.
 * @param {Object} props.project - The project object to be updated.
 * @param {string} props.project.id - The unique identifier of the project.
 * @param {string} [props.project.name] - The name of the project.
 * @param {string} [props.project.description] - The description of the project.
 * @param {string} [props.project.category] - The category of the project.
 * @param {string[]} [props.project.tags] - The tags associated with the project.
 *
 * @returns {JSX.Element|null} The rendered modal dialog or null if no project is provided.
 *
 * @example
 * <UpdateProjectModal
 *   open={isModalOpen}
 *   setOpen={setModalOpen}
 *   project={{
 *     id: "123",
 *     name: "Project Alpha",
 *     description: "A sample project",
 *     category: "frontend",
 *     tags: ["react", "javascript"]
 *   }}
 * />
 */
const UpdateProjectModal = ({ open, setOpen, project }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    tags: [],
  });

  useEffect(() => {
    if (project) {
      setForm({
        name: project.name || "",
        description: project.description || "",
        category: project.category || "",
        tags: project.tags || [],
      });
    } else {
        // Optional: Reset form if project becomes null/undefined while modal is open
        setForm({ name: "", description: "", category: "", tags: [] });
    }
  }, [project]); // Depend only on project

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleTagsChange = (checked, tag) => {
    setForm((prev) => {
        const currentTags = prev.tags || []; // Ensure tags is always an array
        if (checked) {
            // Add tag if not already present
            return { ...prev, tags: [...new Set([...currentTags, tag])] };
        } else {
            // Remove tag
            return { ...prev, tags: currentTags.filter((t) => t !== tag) };
        }
    });
  };


  const handleSubmit = () => {
    // --- Crucial Check ---
    if (!project || typeof project.id === 'undefined') { // Check both project and its id
      console.error("Project or Project ID is undefined. Cannot update.", project);
      // Optionally show an error message to the user
      return;
    }
    // --- End Check ---

    // Prepare the data in the structure expected by the Action
    const projectData = { ...form }; // The data fields to update
    const projectId = project.id;   // The ID for the URL path parameter

    // --- Dispatch with the CORRECT structure ---
    dispatch(updateProjectById({ projectData, projectId }));
    // --- End Dispatch ---

    setOpen(false); // Close modal on successful dispatch attempt
  };

  // Ensure project exists before rendering form content that depends on it
  if (!project) {
    return null; // Or a loading indicator/message if the modal is open without a project
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Project</DialogTitle>
        </DialogHeader>

        {/* Name Input */}
        <div className="space-y-2">
          <Label htmlFor="name">Project Name</Label>
          <Input
            id="name" // Good practice to match htmlFor
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter project name"
          />
        </div>

        {/* Description Input */}
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description" // Good practice
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter project description"
          />
        </div>

        {/* Category Input */}
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category" // Good practice
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="e.g., frontend, backend, fullStack"
          />
        </div>

        {/* Tags Multi-Select with Checkboxes */}
        <div className="space-y-2">
          <Label>Tags</Label>
          <ScrollArea className="h-[150px] w-full mb-2 rounded-md border p-2 space-y-2">
            {tagList
              .filter((tag) => tag !== "all") // Keep filtering out 'all'
              .map((tag) => (
                <div key={tag} className="flex mb-4 items-center space-x-2">
                  <Checkbox
                    id={`tag-${tag}`}
                    // Ensure form.tags is always an array before calling .includes()
                    checked={(form.tags || []).includes(tag)}
                    onCheckedChange={(checked) => handleTagsChange(checked, tag)} // Use dedicated handler
                  />
                  <Label htmlFor={`tag-${tag}`} className="font-normal"> {/* Optional: make label less bold */}
                    {tag}
                  </Label>
                </div>
              ))}
          </ScrollArea>
        </div>

        {/* Submit Button */}
        <div className="pt-4 flex justify-end">
          <Button onClick={handleSubmit}>Update Project</Button> {/* More specific text */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProjectModal;
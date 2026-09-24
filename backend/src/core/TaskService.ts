import TaskModel, { ITask } from "../Models/TaskModel";
import Task from "./Task";
import TaskStatus from "./TaskStatus";
import TaskPriority from "./TaskPriority";
import mongoose from "mongoose";

class TaskService {
    private constructor() {}

    static async createTask(task: Task): Promise<string> {
        try {
            const newTask = await TaskModel.create({
                teamId: task.getTeamId() as any,
                eventId: (task.getEventId() || undefined) as any,
                title: task.getTitle(),
                description: task.getDescription() || undefined,
                status: task.getStatus(),
                priority: task.getPriority(),
                assignedTo: (task.getAssignedTo() || undefined) as any,
                dueDate: task.getDueDate() || undefined,
                createdBy: task.getCreatedBy() as any
            });

            return (newTask as any)._id.toString();
        } catch (e) {
            console.log("Error creating task: ", e);
            throw e;
        }
    }

    static async getTaskById(taskId: string): Promise<ITask | null> {
        try {
            const task = await TaskModel.findById(taskId)
                .populate("createdBy", "name email")
                .populate("assignedTo", "name email");

            return task;
        } catch (e) {
            console.log("Error fetching task: ", e);
            throw e;
        }
    }

    static async getTasksByTeam(teamId: string): Promise<ITask[]> {
        try {
            const tasks = await TaskModel.find({ teamId })
                .populate("createdBy", "name email")
                .populate("assignedTo", "name email")
                .sort({ createdAt: -1 });

            return tasks;
        } catch (e) {
            console.log("Error fetching team tasks: ", e);
            throw e;
        }
    }

    static async getTasksByStatus(teamId: string, status: TaskStatus): Promise<ITask[]> {
        try {
            const tasks = await TaskModel.find({ teamId, status })
                .populate("createdBy", "name email")
                .populate("assignedTo", "name email")
                .sort({ createdAt: -1 });

            return tasks;
        } catch (e) {
            console.log("Error fetching tasks by status: ", e);
            throw e;
        }
    }

    static async getTasksByAssignee(userId: string): Promise<ITask[]> {
        try {
            const tasks = await TaskModel.find({ assignedTo: userId })
                .populate("createdBy", "name email")
                .sort({ dueDate: 1 });

            return tasks;
        } catch (e) {
            console.log("Error fetching assigned tasks: ", e);
            throw e;
        }
    }

    static async updateTask(taskId: string, updates: Partial<ITask>): Promise<ITask | null> {
        try {
            const task = await TaskModel.findByIdAndUpdate(
                taskId,
                updates,
                { new: true, runValidators: true }
            );

            return task;
        } catch (e) {
            console.log("Error updating task: ", e);
            throw e;
        }
    }

    static async deleteTask(taskId: string): Promise<boolean> {
        try {
            const result = await TaskModel.deleteOne({ _id: taskId });
            return result.deletedCount > 0;
        } catch (e) {
            console.log("Error deleting task: ", e);
            throw e;
        }
    }

    static async addComment(taskId: string, userId: string, content: string): Promise<ITask | null> {
        try {
            const task = await TaskModel.findByIdAndUpdate(
                taskId,
                {
                    $push: {
                        comments: {
                            userId,
                            content
                        }
                    }
                },
                { new: true }
            ).populate("comments.userId", "name email");

            return task;
        } catch (e) {
            console.log("Error adding comment: ", e);
            throw e;
        }
    }

    static async updateComment(
        taskId: string,
        commentId: string,
        userId: string,
        content: string
    ): Promise<ITask | null> {
        try {
            const task = await TaskModel.findOneAndUpdate(
                {
                    _id: taskId,
                    "comments._id": commentId,
                    "comments.userId": userId
                },
                {
                    $set: {
                        "comments.$.content": content
                    }
                },
                { new: true }
            ).populate("comments.userId", "name email");

            return task;
        } catch (e) {
            console.log("Error updating comment: ", e);
            throw e;
        }
    }

    static async deleteComment(
        taskId: string,
        commentId: string,
        userId: string
    ): Promise<ITask | null> {
        try {
            const task = await TaskModel.findOneAndUpdate(
                {
                    _id: taskId,
                    "comments._id": commentId,
                    "comments.userId": userId
                },
                {
                    $pull: {
                        comments: { _id: commentId }
                    }
                },
                { new: true }
            );

            return task;
        } catch (e) {
            console.log("Error deleting comment: ", e);
            throw e;
        }
    }
}

export default TaskService;

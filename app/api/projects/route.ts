import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET - Fetch all projects
export async function GET(req: NextRequest) {
  try {
    const db = await getDatabase();
    const projectsCollection = db.collection("projects");

    const projects = await projectsCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      projects: projects.map(project => ({
        ...project,
        _id: project._id.toString(),
      })),
    });
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST - Create new project
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, category, image, tags, githubUrl, liveUrl, featured } = body;

    if (!title || !description) {
      return NextResponse.json(
        { success: false, message: "Title and description are required" },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const projectsCollection = db.collection("projects");

    const newProject = {
      title,
      description,
      category: category || "Web Development",
      image: image || "",
      tags: tags || [],
      githubUrl: githubUrl || "",
      liveUrl: liveUrl || "",
      featured: featured || false,
      order: 0, // For drag-drop ordering later
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await projectsCollection.insertOne(newProject);

    return NextResponse.json({
      success: true,
      project: {
        ...newProject,
        _id: result.insertedId.toString(),
      },
      message: "Project created successfully",
    });
  } catch (error) {
    console.error("Failed to create project:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create project" },
      { status: 500 }
    );
  }
}

// PUT - Update project
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { _id, title, description, category, image, tags, githubUrl, liveUrl, featured } = body;

    if (!_id) {
      return NextResponse.json(
        { success: false, message: "Project ID is required" },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const projectsCollection = db.collection("projects");

    const updateData: any = {
      updatedAt: new Date(),
    };

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (category !== undefined) updateData.category = category;
    if (image !== undefined) updateData.image = image;
    if (tags !== undefined) updateData.tags = tags;
    if (githubUrl !== undefined) updateData.githubUrl = githubUrl;
    if (liveUrl !== undefined) updateData.liveUrl = liveUrl;
    if (featured !== undefined) updateData.featured = featured;

    const result = await projectsCollection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Project updated successfully",
    });
  } catch (error) {
    console.error("Failed to update project:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update project" },
      { status: 500 }
    );
  }
}

// DELETE - Delete project
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Project ID is required" },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const projectsCollection = db.collection("projects");

    const result = await projectsCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete project:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete project" },
      { status: 500 }
    );
  }
}

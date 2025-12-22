import { Box, Paper, Typography } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState } from "react";

const initialData = {
  todo: ["Design UI", "Setup Firebase", "Write Docs"],
  inProgress: ["Build Dashboard"],
  done: ["Setup Repo", "Deploy Vercel"],
};

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(initialData);

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceList = [...tasks[source.droppableId]];
    const destList = [...tasks[destination.droppableId]];

    const [movedTask] = sourceList.splice(source.index, 1);
    destList.splice(destination.index, 0, movedTask);

    setTasks({
      ...tasks,
      [source.droppableId]: sourceList,
      [destination.droppableId]: destList,
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Box display="flex" gap={3} mt={3} flexWrap="wrap">
        {Object.keys(tasks).map((column) => (
          <Droppable key={column} droppableId={column}>
            {(provided) => (
              <Paper
                elevation={3}
                sx={{ width: 300, p: 2, borderRadius: 3 }}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <Typography variant="h6" mb={2} textTransform="capitalize">
                  {column.replace(/([A-Z])/g, " $1")}
                </Typography>

                {tasks[column].map((task, index) => (
                  <Draggable key={task} draggableId={task} index={index}>
                    {(provided) => (
                      <Paper
                        sx={{
                          p: 1.5,
                          mb: 1.5,
                          borderRadius: 2,
                          backgroundColor: "#fafafa",
                        }}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {task}
                      </Paper>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Paper>
            )}
          </Droppable>
        ))}
      </Box>
    </DragDropContext>
  );
};

export default KanbanBoard;

import { useAcceptParticipantMutation } from "@/hooks/subgraph/querycall";

const useAcceptParticipant = () => {
  // Don't initialize mutation if taskId is empty
  const { mutateAsync: acceptParticipant } = useAcceptParticipantMutation();

  const handleAcceptParticipant = async (
    taskId: string, 
    participant: string, 
    entityId: string
  ) => {
    if (!taskId) {
      console.error('Invalid taskId provided');
      return;
    }

    try {
      await acceptParticipant({ taskId, participant, entityId });
    } catch (error) {
      console.error("Error accepting participant:", error);
      throw error; // Re-throw to handle in the column component
    }
  };

  return { handleAcceptParticipant };
};

export default useAcceptParticipant;

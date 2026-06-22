import { createContext, useContext, useState, useCallback } from "react";
import { useAuth } from "./AuthContext";

interface EditModeContextType {
  isEditMode: boolean;
  toggleEditMode: () => void;
  enableEditMode: () => void;
  disableEditMode: () => void;
}

const EditModeContext = createContext<EditModeContextType>({
  isEditMode: false,
  toggleEditMode: () => {},
  enableEditMode: () => {},
  disableEditMode: () => {},
});

export function EditModeProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = useCallback(() => {
    if (!isAuthenticated) return;
    setIsEditMode((prev) => !prev);
  }, [isAuthenticated]);

  const enableEditMode = useCallback(() => {
    if (!isAuthenticated) return;
    setIsEditMode(true);
  }, [isAuthenticated]);

  const disableEditMode = useCallback(() => {
    setIsEditMode(false);
  }, []);

  return (
    <EditModeContext.Provider
      value={{ isEditMode, toggleEditMode, enableEditMode, disableEditMode }}
    >
      {children}
    </EditModeContext.Provider>
  );
}

export function useEditMode() {
  return useContext(EditModeContext);
}

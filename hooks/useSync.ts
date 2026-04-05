import NetInfo from "@react-native-community/netinfo";
import { useEffect } from "react";
import { syncTodos } from "../services/syncService";

export const useSync = () => {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        console.log("🌐 ONLINE → trigger sync");
        syncTodos();
      }
    });

    return () => unsubscribe();
  }, []);
};

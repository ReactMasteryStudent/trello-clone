import React from "react";
import useCallApi from "../useCallApi/useCallApi";

const BASE_URL = "http://localhost:5001/api";

export const useGetWorkspace = () => {
  const { data, isLoading, error, sendRequest } = useCallApi();
  React.useEffect(() => {
    sendRequest(BASE_URL + "/workspace", {
      method: "GET",
      body: null,
      headers: {
        "content-type": "application/json",
      },
    });
  }, [sendRequest]);
  return { data, isLoading, error };
};

export const usePatchWorkspace = (id, name) => {
  const { data, isLoading, error, sendRequest } = useCallApi();
  React.useEffect(() => {
    sendRequest(BASE_URL + "/workspace", {
      method: "PATCH",
      body: { id, name },
      headers: {
        "content-type": "application/json",
      },
    });
  }, []);
  return { data, isLoading, error };
};

export const usePostBoard = (name, image = "") => {
  const { data, isLoading, error, sendRequest } = useCallApi();
  React.useEffect(() => {
    sendRequest(BASE_URL + "/board", {
      method: "POST",
      body: { name, image },
      headers: {
        "content-type": "application/json",
      },
    });
  }, []);
  return { data, isLoading, error };
};

export const usePatchBoard = (id, name, image = null) => {};

export const useDeleteBoard = (id) => {};

export const usePostSection = (boardId, sectionToAdd) => {};

export const usePatchSection = (sectionRewriteObject) => {};

export const useDeleteSection = (id) => {};

export const usePostCard = (sectionId, cardDetail) => {};

export const usePatchCard = (cardRewriteObject) => {};

export const useDeleteCard = (id) => {};

const Requests = {
  useGetWorkspace,
  usePatchWorkspace,
  usePostBoard,
  usePatchBoard,
  useDeleteBoard,
  usePostSection,
  usePatchSection,
  useDeleteSection,
  usePostCard,
  usePatchCard,
  useDeleteCard,
};

export default Requests;

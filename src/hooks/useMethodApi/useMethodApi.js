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
      body: JSON.stringify({ id, name }),
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
      body: JSON.stringify({ name, image }),
      headers: {
        "content-type": "application/json",
      },
    });
  }, []);
  return { data, isLoading, error };
};

export const usePatchBoard = (id, name, image = "") => {
  const { data, isLoading, error, sendRequest } = useCallApi();
  React.useEffect(() => {
    sendRequest(BASE_URL + "/board", {
      method: "PATCH",
      body: JSON.stringify({ id, name, image }),
      headers: {
        "content-type": "application/json",
      },
    });
  }, []);
  return { data, isLoading, error };
};

export const useDeleteBoard = (id) => {
  const { data, isLoading, error, sendRequest } = useCallApi();
  React.useEffect(() => {
    sendRequest(BASE_URL + "/board/" + id, {
      method: "DELETE",
      body: null,
      headers: {
        "content-type": "application/json",
      },
    });
  }, []);
  return { data, isLoading, error };
};

export const usePostSection = (boardId, sectionToAdd) => {
  const { data, isLoading, error, sendRequest } = useCallApi();
  React.useEffect(() => {
    sendRequest(BASE_URL + "/section/" + boardId, {
      method: "POST",
      body: JSON.stringify(sectionToAdd),
      headers: {
        "content-type": "application/json",
      },
    });
  }, []);
  return { data, isLoading, error };
};

export const usePatchSection = (sectionId, newSectionName) => {
  const { data, isLoading, error, sendRequest } = useCallApi();
  React.useEffect(() => {
    sendRequest(BASE_URL + "/section", {
      method: "PATCH",
      body: JSON.stringify({ id: sectionId, name: newSectionName }),
      headers: {
        "content-type": "application/json",
      },
    });
  }, []);
  return { data, isLoading, error };
};

export const useDeleteSection = (id) => {
  const { data, isLoading, error, sendRequest } = useCallApi();
  React.useEffect(() => {
    sendRequest(BASE_URL + "/section/" + id, {
      method: "DELETE",
      body: null,
      headers: {
        "content-type": "application/json",
      },
    });
  }, []);
  return { data, isLoading, error };
};

export const usePostCard = (sectionId, cardTitle, cardDescription) => {
  const { data, isLoading, error, sendRequest } = useCallApi();
  React.useEffect(() => {
    sendRequest(BASE_URL + "/card/" + sectionId, {
      method: "POST",
      body: JSON.stringify({ title: cardTitle, description: cardDescription }),
      headers: {
        "content-type": "application/json",
      },
    });
  }, []);
  return { data, isLoading, error };
};

export const usePatchCard = (cardRewriteObject) => {};

export const useDeleteCard = (idCardToDelete) => {
  const { data, isLoading, error, sendRequest } = useCallApi();
  React.useEffect(() => {
    sendRequest(BASE_URL + "/card/" + idCardToDelete, {
      method: "DELETE",
      body: null,
      headers: {
        "content-type": "application/json",
      },
    });
  }, []);
  return { data, isLoading, error };
};

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

import { createContext, useEffect, useState } from "react"
import { databases, client, ID, Query, Permission, Role } from "../lib/appwrite"
import { useUser } from "../hooks/useUser"



export const CaseContext = createContext()

export function CaseProvider({children}) {

  // Get user info
  const {  user } = useUser()

  // State
  const [ cases, setCases ] = useState([])
  const [ selectedCase, setSelectedCase ] = useState(null)
  const [ nodes, setNodes ] = useState([])
  const [ links, setLinks ] = useState([])
  const [ loading, setLoading ] = useState(false)

  // Environment Variable Aliases
  const DB_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID
  const CASES_ID = process.env.EXPO_PUBLIC_APPWRITE_CASES_ID
  const NODES_ID = process.env.EXPO_PUBLIC_APPWRITE_NODES_ID
  const LINKS_ID = process.env.EXPO_PUBLIC_APPWRITE_LINKS_ID

// --------------------- CASES ------------------------------

  async function fetchCases() {
    try {
      const response = await databases.listDocuments(
        DB_ID,
        CASES_ID,
        [
            Query.equal('userId', user.$id)
        ]
      )

      setCases(response.documents)
      //console.log(response.documents)

    } catch (error) {
      console.error("fetchCases: ",error.message)
    }
  }

  async function fetchCaseById(id) {
    try {
      const response = await databases.getDocument(
        DB_ID,
        CASES_ID,
        id
      )

      return response 
    } catch (error) {
      console.log("fetchCaseById: ", error.message)
    }
  }

  async function createCase(data) {
    try {
      await databases.createDocument(
        DB_ID,
        CASES_ID,
        ID.unique(),
        {...data, userId: user.$id},
        [
            Permission.read(Role.user(user.$id)),
            Permission.update(Role.user(user.$id)),
            Permission.delete(Role.user(user.$id)),
        ]
      )
    } catch (error) {
      console.log("createCase: ", error.message)
    }
  }

  async function updateCase(id, data) {
    try {
      await databases.updateDocument(
        DB_ID,
        CASES_ID,
        id,
        data,
      )

    } catch (error) {
      console.error("updateCase: ", error.message)
    }

  }

  // ------ Cascading Delete: remove nodes and links first-----
  async function deleteCase(id) {
    try {
      // Fetch and delete nodes and links first
      // May need some check here in case there are no associated nodes and links
      const [ nodesRes, linksRes ] = await Promise.all([
        databases.listDocuments(DB_ID, NODES_ID, [Query.equal("caseId", id)]),
        databases.listDocuments(DB_ID, LINKS_ID, [Query.equal("caseId", id)]),
      ])

      // Can probably use already defined deleteNode and deleteLink functions here
      await Promise.all([
        ...nodesRes.documents.map((node) =>
        databases.deleteDocument(DB_ID, NODES_ID, node.$id)
        ),
        ...linksRes.documents.map((link) =>
        databases.deleteDocument(DB_ID, LINKS_ID, link.$id)
        ),
      ])

      // Delete the case
      await databases.deleteDocument(
        DB_ID,
        CASES_ID,
        id
      )
    } catch (error) {
      console.log("deleteCase: ", error.message)
    }
  }

 // ----------------- GRAPH DATA ---------------------------
  // Fetches Nodes and Links for given Case ID
  async function fetchGraphData(caseId) {
    try {
      const nodesRes = await databases.listDocuments(
        DB_ID,
        NODES_ID,
        [
            Query.equal('caseId', caseId)
        ]
      ) 

      const linksRes = await databases.listDocuments(
        DB_ID,
        LINKS_ID,
        [
            Query.equal('caseId', caseId)
        ]
      ) 

      setNodes(nodesRes.documents)
      setLinks(linksRes.documents)
    

      //console.log(nodesRes.documents, linksRes.documents)

    } catch (error) {
      console.error("fetchGraphData: ", error.message)
    }
  }

   // ----------------- NODES ---------------------------
  async function createNode(data) {

    if (!selectedCase) return // Should maybe put an error message here

    try {
      await databases.createDocument(
        DB_ID,
        NODES_ID,
        ID.unique(),
        {...data, userId: user.$id, caseId: selectedCase.$id},
        [
            Permission.read(Role.user(user.$id)),
            Permission.update(Role.user(user.$id)),
            Permission.delete(Role.user(user.$id)),
        ]
      )
    } catch (error) {
      console.log("createNode: ", error.message)
    }
  } 

  async function fetchNodeById(id) {
    try {
      const response = await databases.getDocument(
        DB_ID,
        NODES_ID,
        id
      )

      return response 
    } catch (error) {
      console.log("fetchCaseById: ", error.message)
    }
  }

  async function updateNode(id, data) {

    try {
      await databases.updateDocument(DB_ID, NODES_ID, id, data)
    } catch (error) {
      console.error("updateNode: ", error.message)
    }
  }

  async function deleteNode(id) {
    try {
      await databases.deleteDocument(
        DB_ID,
        NODES_ID,
        id
      )
    } catch (error) {
      console.log("deleteNode: ", error.message)
    }
  }

   // ----------------- LINKS ---------------------------

  async function createLink(data) {

    if (!selectedCase) return // Should maybe put an error message here

    try {
      await databases.createDocument(
        DB_ID,
        LINKS_ID,
        ID.unique(),
        {...data, userId: user.$id, caseId: selectedCase.$id},
        [
            Permission.read(Role.user(user.$id)),
            Permission.update(Role.user(user.$id)),
            Permission.delete(Role.user(user.$id)),
        ]
      )
    } catch (error) {
      console.log("createLink: ", error.message)
    }
  } 

  async function updateLink(id, data) {

    try {
      await databases.updateDocument(DB_ID, LINKS_ID, id, data)
    } catch (error) {
      console.error("updateLink: ", error.message)
    }
  }

  async function deleteLink(id) {
    try {
      await databases.deleteDocument(
        DB_ID,
        LINKS_ID,
        id
      )
    } catch (error) {
      console.log("deleteLink: ", error.message)
    }
  }

     // ----------------- REALTIME SUBSCRIPTIONS ---------------------------

  useEffect(() => {
    if (!user) return

    fetchCases()

    const caseChannel = `databases.${DB_ID}.collections.${CASES_ID}.documents`
    const nodeChannel = `databases.${DB_ID}.collections.${NODES_ID}.documents`
    const linkChannel = `databases.${DB_ID}.collections.${LINKS_ID}.documents`

    const unsubCases = client.subscribe(caseChannel, ({ events, payload }) => {
      if (events.includes("databases.*.collections.*.documents.*.create"))
        setCases((prev) => [...prev, payload])
      if (events.includes("databases.*.collections.*.documents.*.update"))
        setCases((prev) =>
          prev.map((c) => (c.$id === payload.$id ? payload : c))
        )
      if (events.includes("databases.*.collections.*.documents.*.delete"))
        setCases((prev) => prev.filter((c) => c.$id !== payload.$id))
    })

    const unsubNodes = client.subscribe(nodeChannel, ({ events, payload }) => {
      if (!selectedCase || payload.caseId !== selectedCase.$id) return
      if (events.some(e => e.includes(".create")))
        setNodes((prev) => [...prev, payload])
      if (events.some(e => e.includes(".update")))
        setNodes((prev) => prev.map((n) => (n.$id === payload.$id ? payload : n)))
      if (events.some(e => e.includes(".delete")))
        setNodes((prev) => prev.filter((n) => n.$id !== payload.$id))
    })

    const unsubLinks = client.subscribe(linkChannel, ({ events, payload }) => {
      if (!selectedCase || payload.caseId !== selectedCase.$id) return
      if (events.some(e => e.includes(".create")))
        setLinks((prev) => [...prev, payload])
      if (events.some(e => e.includes(".update")))
        setLinks((prev) => prev.map((l) => (l.$id === payload.$id ? payload : l)))
      if (events.some(e => e.includes(".delete")))
        setLinks((prev) => prev.filter((l) => l.$id !== payload.$id))
    })

    return () => {
      unsubCases()
      unsubNodes()
      unsubLinks()
    }
  }, [user, selectedCase])

  return (
    <CaseContext.Provider 
      value={{ cases, selectedCase, setSelectedCase, fetchCases, fetchCaseById,
               createCase, updateCase, deleteCase, nodes, links, createNode, fetchNodeById, updateNode,
               deleteNode, createLink, updateLink, deleteLink, fetchGraphData, loading, setLoading }}
    >
      {children}
    </CaseContext.Provider>
  )
}
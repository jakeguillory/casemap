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
  const [ loading, setLoading ] = useState(true)

  async function fetchCases() {
    try {
      const response = await databases.listDocuments(
        process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.EXPO_PUBLIC_APPWRITE_CASES_ID,
        [
            Query.equal('userId', user.$id)
        ]
      )

      setCases(response.documents)
      console.log(response.documents)

    } catch (error) {
      console.error(error.message)
    }
  }

  async function fetchCaseById(id) {
    try {
      const response = await databases.getDocument(
        process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.EXPO_PUBLIC_APPWRITE_CASES_ID,
        id
      )

        return response 
    } catch (error) {
      console.log(error.message)
    }
  }

  async function createCase(data) {
    try {
      const newCase = await databases.createDocument(
        process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.EXPO_PUBLIC_APPWRITE_CASES_ID,
        ID.unique(),
        {...data, userId: user.$id},
        [
            Permission.read(Role.user(user.$id)),
            Permission.update(Role.user(user.$id)),
            Permission.delete(Role.user(user.$id)),
        ]
      )
    } catch (error) {
      console.log(error.message)
    }
  }

  async function deleteCase(id) {
    try {
      await databases.deleteDocument(
        process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.EXPO_PUBLIC_APPWRITE_CASES_ID,
        id
      )
    } catch (error) {
      console.log(error.message)
    }
  }

  // Fetches Nodes and Links for given Case ID
  async function fetchGraphData(caseId) {
    try {
      const nodesResponse = await databases.listDocuments(
        process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.EXPO_PUBLIC_APPWRITE_NODES_ID,
        [
            Query.equal('caseId', caseId)
        ]
      ) 

      const linksResponse = await databases.listDocuments(
        process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.EXPO_PUBLIC_APPWRITE_Links_ID,
        [
            Query.equal('caseId', caseId)
        ]
      ) 

      setNodes(nodesResponse.documents)
      setLinks(LinksResponse.documents)

      console.log(nodesResponse.documents, linksResponse.documents)

    } catch (error) {
      console.error(error.message)
    }
  }

  async function createNode(data) {

    if (!selectedCase) return // Should maybe put an error message here

    try {
      const newNode = await databases.createDocument(
        process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.EXPO_PUBLIC_APPWRITE_NODES_ID,
        ID.unique(),
        {...data, userId: user.$id, caseID: selectedCase.$id},
        [
            Permission.read(Role.user(user.$id)),
            Permission.update(Role.user(user.$id)),
            Permission.delete(Role.user(user.$id)),
        ]
      )
    } catch (error) {
      console.log(error.message)
    }
  } 

  async function deleteNode(id) {
    try {
      await databases.deleteDocument(
        process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.EXPO_PUBLIC_APPWRITE_NODES_ID,
        id
      )
    } catch (error) {
      console.log(error.message)
    }
  }

  async function createLink(data) {

    if (!selectedCase) return // Should maybe put an error message here

    try {
      const newLink = await databases.createDocument(
        process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.EXPO_PUBLIC_APPWRITE_LINKS_ID,
        ID.unique(),
        {...data, userId: user.$id, caseID: selectedCase.$id},
        [
            Permission.read(Role.user(user.$id)),
            Permission.update(Role.user(user.$id)),
            Permission.delete(Role.user(user.$id)),
        ]
      )
    } catch (error) {
      console.log(error.message)
    }
  } 

  async function deleteLink(id) {
    try {
      await databases.deleteDocument(
        process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.EXPO_PUBLIC_APPWRITE_LINKS_ID,
        id
      )
    } catch (error) {
      console.log(error.message)
    }
  }

  // Need to add functionality for Deleting all Nodes and Links When Deleting Cases (Cascading)
  // Even when deleting users for that matter

  // Need to add Update functions 

  // Need to add realtime for creating and deleting Nodes and Links
  useEffect(() => {

    let unsubscribe
    const channel = `databases.${process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID}.collections.${process.env.EXPO_PUBLIC_APPWRITE_CASES_ID}.documents`

    if (user) {
        fetchCases()

        unsubscribe = client.subscribe(channel, (response) => { 
            const { payload, events } = response

            if (events[0].includes('create')) {
                setCases((prevCases) => [...prevCases, payload])
            }

            if (events[0].includes('delete')) {
                  setCases((prevCases) => prevCases.filter((singleCase) => singleCase.$id !== payload.$id))
            }

        })
    } else {
        setCases([])
    }

    return () => {
        if (unsubscribe) unsubscribe()
    }

  }, [user])

  return (
    <CaseContext.Provider 
      value={{ cases, selectedCase, setSelectedCase, fetchCases, fetchCaseById,
               createCase, deleteCase, nodes, links, createNode, createLink,
               deleteNode, deleteLink, fetchGraphData, loading }}
    >
      {children}
    </CaseContext.Provider>
  )
}
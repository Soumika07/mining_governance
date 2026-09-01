import { analytics, complaints, statCards, users } from '../data/mockData'

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getDashboardStats() {
  await wait(200)
  return statCards
}

export async function getComplaints() {
  await wait(200)
  return complaints
}

export async function getComplaintById(id) {
  await wait(200)
  return complaints.find((item) => item.id === id) || null
}

export async function getUsers() {
  await wait(200)
  return users
}

export async function getAnalytics() {
  await wait(200)
  return analytics
}

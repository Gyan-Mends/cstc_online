import { json } from "@remix-run/node"
import Category from "~/model/category"
import User from "~/model/users"
import Blog from "~/model/blog"
import Training from "~/model/training"
import Contact from "~/model/contact"
import Notice from "~/model/notice"
import Event from "~/model/events"
import Gallery from "~/model/gallery"
import DirectorsBank from "~/model/directorsBank"

type DashboardData = {
    totalUsers: number;
    totalCategories: number;
    totalBlogs: number;
    totalTrainings: number;
    totalMessages: number;
    totalEvents: number;
    totalNotices: number;
    totalGalleryItems: number;
    totalDirectors: number;
    monthlyStats: {
        labels: string[];
        trainings: number[];
        blogs: number[];
        events: number[];
    };
    contentDistribution: {
        labels: string[];
        data: number[];
    };
    userActivity: {
        labels: string[];
        data: number[];
    };
}

type DashboardError = {
    error: string;
}

class DashboardController {
    async getDashboardData(): Promise<DashboardData | DashboardError> {
        try {
            // Get total counts
            const totalUsers = await User.countDocuments()
            const totalCategories = await Category.countDocuments()
            const totalBlogs = await Blog.countDocuments()
            const totalTrainings = await Training.countDocuments()
            const totalMessages = await Contact.countDocuments()
            const totalEvents = await Event.countDocuments()
            const totalNotices = await Notice.countDocuments()
            const totalGalleryItems = await Gallery.countDocuments()
            const totalDirectors = await DirectorsBank.countDocuments()
            
            // Generate monthly stats for the last 6 months
            const monthlyStats = await this.getMonthlyStats()
            
            // Content distribution data
            const contentDistribution = {
                labels: ['Blogs', 'Trainings', 'Events', 'Notices', 'Gallery'],
                data: [totalBlogs, totalTrainings, totalEvents, totalNotices, totalGalleryItems]
            }
            
            // User activity (simulated data)
            const userActivity = await this.getUserActivityData()
            
            return { 
                totalUsers, 
                totalCategories, 
                totalBlogs, 
                totalTrainings, 
                totalMessages,
                totalEvents,
                totalNotices,
                totalGalleryItems,
                totalDirectors,
                monthlyStats,
                contentDistribution,
                userActivity
            }
        } catch (error) {
            return { error: "Failed to fetch dashboard data" }
        }
    }
    
    private async getMonthlyStats() {
        const months = [];
        const trainingsData = [];
        const blogsData = [];
        const eventsData = [];
        
        // Get last 6 months
        const today = new Date();
        
        for (let i = 5; i >= 0; i--) {
            const month = new Date(today.getFullYear(), today.getMonth() - i, 1);
            const monthName = month.toLocaleString('default', { month: 'short' });
            months.push(monthName);
            
            const nextMonth = new Date(month.getFullYear(), month.getMonth() + 1, 1);
            
            // Count items created in this month
            const trainingsCount = await Training.countDocuments({
                createdAt: { 
                    $gte: month, 
                    $lt: nextMonth 
                }
            });
            
            const blogsCount = await Blog.countDocuments({
                createdAt: { 
                    $gte: month, 
                    $lt: nextMonth 
                }
            });
            
            const eventsCount = await Event.countDocuments({
                createdAt: { 
                    $gte: month, 
                    $lt: nextMonth 
                }
            });
            
            trainingsData.push(trainingsCount);
            blogsData.push(blogsCount);
            eventsData.push(eventsCount);
        }
        
        return {
            labels: months,
            trainings: trainingsData,
            blogs: blogsData,
            events: eventsData
        };
    }
    
    private async getUserActivityData() {
        // Simulate user activity data for the last 7 days
        const days = [];
        const activityData = [];
        
        const today = new Date();
        
        for (let i = 6; i >= 0; i--) {
            const day = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
            const dayName = day.toLocaleString('default', { weekday: 'short' });
            days.push(dayName);
            
            // Generate random activity count (in a real app, this would come from user logs)
            const randomActivity = Math.floor(Math.random() * 20) + 5;
            activityData.push(randomActivity);
        }
        
        return {
            labels: days,
            data: activityData
        };
    }
}

const dashboard = new DashboardController
export default dashboard

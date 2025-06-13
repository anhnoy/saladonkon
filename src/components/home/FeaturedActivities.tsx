import { Link } from 'react-router-dom';
import { useHomepageStore } from '../../store/homepageStore';
import activitiesData from '../../data/activitiesData';
import ActivityCard from '../activities/ActivityCard';

const FeaturedActivities = () => {
  const { sections } = useHomepageStore();
  // Get the first 3 activities to showcase as featured
  const featuredActivities = activitiesData.slice(0, 3);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">{sections.activities.title}</h2>
          <p className="section-subtitle mx-auto">
            {sections.activities.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredActivities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link to="/activities" className="btn btn-outline">
            View All Activities
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedActivities;
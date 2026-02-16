import React, { useEffect, useState } from "react";
import { getAllUserProfile } from "../services/auth";
import { Loader2, Store } from "lucide-react";
import BakeryCard from "../components/BakeryCard";
import { useAuth } from "../context/AuthContext";
import { Hourglass } from "lucide-react";

const Bakeries = () => {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        setLoading(true);
        const users = await getAllUserProfile();
        const ownerUsers = users.filter((u) => u.role === "owner");
        setOwners(ownerUsers);
      } catch (error) {
        console.error("Error fetching bakery owners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOwners();
  }, []);

  const BakeryVerificationNotice = () => {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-yellow-600 mb-4">
            We're Verifying Bakery Owners!
          </h2>
          <p className="text-gray-600 mb-6">
            Currently, our bakery owners are undergoing verification. Please check back soon!
          </p>
          <Hourglass className="w-16 h-16 mx-auto text-yellow-600 animate-bounce mb-4" />
          <p className="text-sm text-gray-500">
            Thank you for your patience while we ensure the best quality!
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <Store className="mx-auto text-orange-600 h-10 w-10 mb-3" />
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
            Explore Our <span className="text-orange-600">Bakery Partners</span>
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Discover delightful treats from our top-rated owners and bakeries.
          </p>
        </header>

        {loading ? (
          <div className="flex flex-col justify-center items-center py-24 bg-white rounded-xl shadow-md">
            <Loader2 className="animate-spin text-orange-600 h-10 w-10" />
            <p className="mt-4 text-lg text-gray-600">
              Loading delicious bakeries...
            </p>
          </div>
        ) : owners.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-xl shadow-md">
            <p className="text-2xl font-medium text-gray-500">
              No bakery partners found yet. Check back soon!
            </p>
          </div>
        ) : (
          <>
            {owners.some(owner => owner.ownerInfo?.companyVerified) ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {owners.map((owner) => (
                  owner.ownerInfo?.companyVerified && (
                    <BakeryCard
                      key={owner._id}
                      ownerId={owner._id}
                      company={{
                        companyName: owner.ownerInfo?.companyName,
                        companyLogo: owner.ownerInfo?.companyImage,
                        branches: owner.ownerInfo?.branches,
                        email: owner.email,
                        phone: owner.phone,
                        city: owner.ownerInfo?.address,
                        country: owner.ownerInfo?.location,
                        verified: owner.ownerInfo?.companyVerified,
                        mapLocation: owner.ownerInfo?.mapLocation,
                        description: owner.ownerInfo?.description,
                        website: owner.ownerInfo?.website,
                        establishedYear: owner.ownerInfo?.createdAt
                          ? new Date(owner.ownerInfo.createdAt).getFullYear()
                          : "N/A",
                        owner: owner.name,
                      }}
                    />
                  )
                ))}
              </div>
            ) : (
              <BakeryVerificationNotice />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Bakeries;
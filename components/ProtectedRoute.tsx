import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "./loading-spinner";

const withProtectedRoute = (Component: React.ComponentType) => {
	return function WrappedComponent(props: any) {
		const { isAuthenticated, isLoading } = useAuth();
		const router = useRouter();

		useEffect(() => {
			if (!isLoading && !isAuthenticated) {
				router.push("/login");
			}
		}, [isLoading, isAuthenticated, router]);
		
		if (isLoading) {
			return <LoadingSpinner />;
		}

		return <Component {...props} />;
	};
};

export default withProtectedRoute;

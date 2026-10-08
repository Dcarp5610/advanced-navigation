// Imports the React tools needed to create shared state
// that can be accessed by multiple components.
import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from 'react';

// Defines the interaction information stored for each post.
interface PostInteraction {
  // Tracks whether the current user has liked the post.
  liked: boolean;

  // Tracks whether the current user has reposted the post.
  reposted: boolean;
}

// Defines the functions and data that will be available
// through the Post Interaction Context.
interface PostInteractionContextType {

  // Gets the interaction state for a specific post.
  getInteraction: (
    postId: number,
  ) => PostInteraction;

  // Toggles the like state for a specific post.
  toggleLike: (postId: number) => void;

  // Toggles the repost state for a specific post.
  toggleRepost: (postId: number) => void;
}

// Creates the shared context.
// It starts as undefined until the provider supplies its value.
const PostInteractionContext =
  createContext<PostInteractionContextType | undefined>(
    undefined,
  );

// Defines the props required by the provider.
interface PostInteractionProviderProps {
  // ReactNode allows the provider to contain
  // all of the application's child components.
  children: ReactNode;
}

// Provider component that makes post interaction state
// available to screens and components throughout the app.
export function PostInteractionProvider({
  children,
}: PostInteractionProviderProps) {

  // Stores the interaction state for every post.
  //
  // The post ID is used as the key so each post can
  // have its own like and repost state.
  const [interactions, setInteractions] = useState<
    Record<number, PostInteraction>
  >({});

  // Gets the interaction information for a specific post.
  const getInteraction = (
    postId: number,
  ): PostInteraction => {

    // If the post already has interaction data,
    // return that data.
    //
    // Otherwise, return the default state where
    // the post has not been liked or reposted.
    return (
      interactions[postId] ?? {
        liked: false,
        reposted: false,
      }
    );
  };

  // Toggles the liked state for a specific post.
  const toggleLike = (postId: number) => {

    // Updates the existing interaction state.
    setInteractions((current) => {

      // Gets the current state for this post.
      // If none exists yet, use the default state.
      const existing = current[postId] ?? {
        liked: false,
        reposted: false,
      };

      // Creates a new interactions object
      // while keeping the state of all other posts.
      return {
        ...current,

        // Updates only the selected post.
        [postId]: {
          ...existing,

          // Switches liked from true to false
          // or from false to true.
          liked: !existing.liked,
        },
      };
    });
  };

  // Toggles the reposted state for a specific post.
  const toggleRepost = (postId: number) => {

    // Updates the existing interaction state.
    setInteractions((current) => {

      // Gets the current state for this post.
      // If none exists yet, use the default state.
      const existing = current[postId] ?? {
        liked: false,
        reposted: false,
      };

      // Creates a new interactions object
      // while keeping the state of all other posts.
      return {
        ...current,

        // Updates only the selected post.
        [postId]: {
          ...existing,

          // Switches reposted from true to false
          // or from false to true.
          reposted: !existing.reposted,
        },
      };
    });
  };

  return (
    // Makes the interaction functions and state
    // available to all components inside the provider.
    <PostInteractionContext.Provider
      value={{
        getInteraction,
        toggleLike,
        toggleRepost,
      }}
    >
      {/* Renders all components wrapped by the provider. */}
      {children}
    </PostInteractionContext.Provider>
  );
}

// Custom hook used by components that need access
// to the shared post interaction functions.
export function usePostInteractions() {

  // Retrieves the context created above.
  const context = useContext(PostInteractionContext);

  // Makes sure this hook is only used inside
  // a PostInteractionProvider.
  if (!context) {
    throw new Error(
      'usePostInteractions must be used inside PostInteractionProvider',
    );
  }

  // Returns the shared interaction functions.
  return context;
}
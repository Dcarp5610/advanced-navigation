import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from 'react';

interface PostInteraction {
  liked: boolean;
  reposted: boolean;
}

interface PostInteractionContextType {
  getInteraction: (postId: number) => PostInteraction;
  toggleLike: (postId: number) => void;
  toggleRepost: (postId: number) => void;
}

const PostInteractionContext =
  createContext<PostInteractionContextType | undefined>(
    undefined,
  );

interface PostInteractionProviderProps {
  children: ReactNode;
}

export function PostInteractionProvider({
  children,
}: PostInteractionProviderProps) {
  const [interactions, setInteractions] = useState<
    Record<number, PostInteraction>
  >({});

  const getInteraction = (postId: number): PostInteraction => {
    return (
      interactions[postId] ?? {
        liked: false,
        reposted: false,
      }
    );
  };

  const toggleLike = (postId: number) => {
    setInteractions((current) => {
      const existing = current[postId] ?? {
        liked: false,
        reposted: false,
      };

      return {
        ...current,
        [postId]: {
          ...existing,
          liked: !existing.liked,
        },
      };
    });
  };

  const toggleRepost = (postId: number) => {
    setInteractions((current) => {
      const existing = current[postId] ?? {
        liked: false,
        reposted: false,
      };

      return {
        ...current,
        [postId]: {
          ...existing,
          reposted: !existing.reposted,
        },
      };
    });
  };

  return (
    <PostInteractionContext.Provider
      value={{
        getInteraction,
        toggleLike,
        toggleRepost,
      }}
    >
      {children}
    </PostInteractionContext.Provider>
  );
}

export function usePostInteractions() {
  const context = useContext(PostInteractionContext);

  if (!context) {
    throw new Error(
      'usePostInteractions must be used inside PostInteractionProvider',
    );
  }

  return context;
}
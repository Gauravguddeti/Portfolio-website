import { lazy, Suspense, ComponentType } from 'react'

interface LazyLoadProps {
  fallback?: React.ReactNode
}

// Lazy load component wrapper with better fallback
export const lazyLoad = <T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback: React.ReactNode = (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="w-8 h-8 border-4 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
    </div>
  )
) => {
  const LazyComponent = lazy(importFunc)

  return (props: React.ComponentProps<T>) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  )
}

// Image lazy loading with intersection observer
export const LazyImage = ({
  src,
  alt,
  className = '',
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) => {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
      {...props}
    />
  )
}

export default lazyLoad

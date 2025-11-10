'use client';
import { Card, CardContent, CardHeader } from '@innovo/ui';
import Image from 'next/image';
import React from 'react';

export interface Blog {
  title: string;
  description: string;
  image: string;
  date: string;
  link: string;
}

interface BlogsSectionProps {
  blogs: Blog[];
}

export const BlogsSection: React.FC<BlogsSectionProps> = ({ blogs }) => {
  const [tempBlogs, setTempBlogs] = React.useState<Blog[]>(blogs);
  return (
    <div className={'grid grid-cols-12 gap-4'}>
      {tempBlogs.map((blog) => (
        <div className={'md:col-span-3 col-span-12'} key={blog.title}>
          <Card
            threeDEffect
            className={'h-full cursor-pointer'}
            onClick={() => window.open(blog.link, '_blank')}
          >
            <CardHeader
              threeDEffect
              className={'p-0 h-[200px] w-full relative overflow-hidden'}
            >
              <Image
                src={blog.image}
                alt={blog.title}
                onError={(e) => {
                  setTempBlogs((prev) => {
                    return prev.map((prevBlog) => {
                      if (prevBlog.title === blog.title) {
                        return {
                          ...prevBlog,
                          image: '/static/error-free-solution.webp',
                        };
                      }
                      return prevBlog;
                    });
                  });
                }}
                fill
                className={'rounded-t-[30px] object-cover bg-center'}
              />
            </CardHeader>
            <CardContent threeDEffect className={'text-white mt-[10px]'}>
              <p className={'text-muted-foreground text-sm'}>{blog.date}</p>

              <a className={'text-2xl'}>{blog.title}</a>
              <p className={'text-muted-foreground text-sm'}>
                {blog.description}
              </p>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

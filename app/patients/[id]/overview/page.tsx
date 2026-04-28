import React from "react";

const page: React.FC<{
  params: Promise<{ id: string }>;
}> = async ({ params }) => {
  const { id } = await params;
  console.log(id);
  
  return (
    <div>
      <h1>Overview</h1>
    </div>
  );
};
export default page;

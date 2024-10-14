import UserTabs from '@/components/layout/UserTabs';
export default function CategoriesPage() {
  return (
    <section className="mt-8 max-w-lg mx-auto">
        <UserTabs isAdmin={true}/>
        <form className="mt-8">
            <div className="flex gap-2 items-end">
                <div className="grow">
                    <label>New Category name</label>
                    <input type="text" />
                </div>
                <div className="pb-2">
                    <button className="border border-primary" type="submit">
                        Create
                    </button>
                </div>
            </div>
        </form>
        <div>
            <h2 className="mt-8 text-sm text-gray-500">Edit Category:</h2>
            {/* {CategoriesPage.map((category) => (
                // <div className="bg-gray-200 rounded-lg p-2 px-4 flex gap-1
                // cursor-pointer mb-1">
                //     <span>{c.name}</span>
                //     {c.name}
                // </div>
            ))} */}
        </div>
    </section>
  );
}

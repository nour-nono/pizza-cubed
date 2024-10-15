import UserTabs from "@/components/layout/UserTabs"
import MenuItem from "@/components/menu/MenuItem"
import Link from "next/link"


export default function MenuItemPage() {
  return (
    <section className="mt-8">
      <UserTabs isAdmin={true}/>
      {/* <div className="mt-8">
        <Link className="button flex" href={'/menu-items/new'}>
          <span>Create new Menu Item</span>
          <Right/>
        <Link/>
      </div> */}
      <div>
        <h2 className="text-sm text-gray-500 mt-8">Edit Menu item:</h2>
        {/* <div className="grid grid-cols-3">
          {menuItems?.length > 0 && menuItem.map(item => (
            <Link href={'/menu-items/edit/'+item._id} 
            className="bg-gray-300 rounded-lg p-4">
              <div className="relative">
                <Image className="rounded-md"
                src={item.image} alt={''} width={100} height={100} />
              </div>
              <div className="text-center">
                {item.name}
              </div>
              {item.name}
            </Link>
          ))}
        </div> */}
      </div>
    </section>
  )
}

import React from 'react'

function Member(props) {
    const BadgeColor = new Map([
        ["sound editor", "bg-yellow-300 text-black"],
        ["video editor", "bg-blue-500 text-white"],
        ["thumbnail editor", "bg-red-200 text-red-700"]
    ])
  return (
    <div className="member flex py-3 px-2 border-b-2 border-gray-100">
        <div className="pr w-[15%] mx-4">
            <img className='rounded-full' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" />
        </div>
        <div className="dtls flex flex-col ml-2">
            <p className='font-csh'>{props.member.username}</p>
            <div className='flex my-1'>
                {
                    props.member.role.map((r)=>{
                        return <span className={`rounded-2xl ${BadgeColor.get(r)} text-[10px] font-csh w-fit px-[5px] mr-2`}>{r}</span>
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default Member
import { useQuery } from "@tanstack/react-query";
import { fetchMembers } from "../api/members";
import { useAuth } from "../contexts/AuthContext";
import { Member } from "../types/members";

const MemberRow = ({ member }: { member: Member }) => {
    const { firstName, lastName, address, ssn } = member
    return <tr >
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{address}</td>
        <td>{ssn}</td>
    </tr>
}

const Table = () => {
    const { token } = useAuth()
    const { data: members, isLoading, isError } = useQuery({
        queryKey: ['members'],
        queryFn: () => fetchMembers(token),
        enabled: !!token,
        refetchInterval: 120000
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching members</div>;

    return <div>
        <table className="border-solid border-2 w-[40rem]">
            <thead >
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Address</th>
                    <th>SSN</th>
                </tr>
            </thead>
            <tbody>
                {members?.map((member) => {
                    return <MemberRow member={member} key={member.ssn} />
                })}
            </tbody>
        </table>
    </div>

}

export default Table
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { H1 } from '@/components/ui/typography';
import { useQueryClient } from '@tanstack/react-query';
import {
    getUserByEmail,
    useCreateUserMutation,
    USER_LOCAL_STORAGE_KEY,
} from '@/lib/api/user';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { Loading } from '@/components/loading';

const registrationSchema = z.object({
    email: z.string().email(),
    firstName: z.string().min(2).max(50),
    lastName: z.string().optional(),
});

type TRegistrationSchema = z.infer<typeof registrationSchema>;

export function Registration() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const createUserMutation = useCreateUserMutation();

    const form = useForm<TRegistrationSchema>({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
        },
        resolver: zodResolver(registrationSchema),
    });

    async function submitRegistrationForm(values: TRegistrationSchema) {
        setIsLoading(true);
        try {
            const data = await queryClient.fetchQuery(
                getUserByEmail(values.email),
            );

            if (data?.email !== values.email) {
                await createUserMutation.mutateAsync(values);
            } else {
                localStorage.setItem(
                    USER_LOCAL_STORAGE_KEY,
                    JSON.stringify(data),
                );
            }
            navigate({ to: '/map' });
        } catch (e) {
            console.error('login failed', e);
        } finally {
            setIsLoading(false);
        }
    }

    document.body.style.backgroundColor = "#F2F6FF";

    return (
        <div className="mx-8 my-24 text-cornflower-blue">
            {isLoading && <Loading />}

            <H1>Login</H1>
            <Form.Root {...form}>
                <form
                    onSubmit={form.handleSubmit((value) =>
                        submitRegistrationForm(value),
                    )}
                    className="flex flex-col gap-6"
                >
                    <Form.Field
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <Form.Item>
                                <Form.Label className='text-cotton-light-gray'>Firstname</Form.Label>
                                <Form.Control className='shadow-none border-none'>
                                    <Input placeholder="Ash" {...field} />
                                </Form.Control>
                                <Form.Message />
                            </Form.Item>
                        )}
                    />

                    <Form.Field
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <Form.Item>
                                <Form.Label className='text-cotton-light-gray'>Lastname (optional)</Form.Label>
                                <Form.Control className='shadow-none border-none'>
                                    <Input placeholder="Ketchum" {...field} />
                                </Form.Control>
                                <Form.Message />
                            </Form.Item>
                        )}
                    />

                    <Form.Field
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <Form.Item>
                                <Form.Label className='text-cotton-light-gray'>Email</Form.Label>
                                <Form.Control className='shadow-none border-none'>
                                    <Input placeholder="ash.ketchum@anilog.com" {...field} />
                                </Form.Control>
                                <Form.Message />
                            </Form.Item>
                        )}
                    />

                    <Button className='shadow-none bg-circled bg-no-repeat bg-center h-16'>Log In</Button>
                </form>
            </Form.Root>
        </div>
    );
}
